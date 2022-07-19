import { FormEvent, useEffect, useState } from "react"

import { mockData } from "../data/data"
import {
  LayoutContainer,
  ILayoutSection,
  createLayout,
  createNewSection,
  changeSectionStyles,
  addToRow,
  addToItem,
  LayoutProvider
} from "react-layouts-builder"
import { storage } from "../localSorage"
import "react-layouts-builder/packages/index.css"
import { ChangeEvent } from "react"
import { TestComponent } from "./TestComponent"
import { useCallback } from "react"
import { ComponentTestts } from "./ComponentTest"

export const InnerLayouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([])
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [nodata, setnodata] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [focused, setFocused] = useState<any>()
  const [mobile, setMobile] = useState(false)
  const [clickSection, setclickSection] = useState<ILayoutSection>()
  const [staticss, setStaticss] = useState<boolean>(false)
  const [disableChange, setDisableChange] = useState<boolean>(false)
  const [focusItem, setFocusItem] = useState<any>()
  const handleLayoutChange = (layouts: ILayoutSection[]) => {
    setLayoutTest(layouts)
  }
  useEffect(() => {
    const l = storage.get()

    setTimeout(() => {
      if (l?.length > 0) {
        setLayoutTest(l)
      } else {
        setnodata(true)
      }
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!loading && nodata && data) {
      const c = createLayout(data, "id", undefined, { width: 1024 })
      setLayoutTest(c)
    }
  }, [loading, data, nodata])

  const handleSabmit = (e: FormEvent) => {
    e.preventDefault()

    const newSection = createNewSection(["EMPTY_SECTION"])
    setLayoutTest((prev) => prev.concat(newSection))
    setValue("")
  }
  useEffect(() => {
    setData(mockData)
  }, [])

  const changeBg = (color: string) => {
    if (clickSection) {
      const l = storage.get()
      const change = changeSectionStyles(l, clickSection.id, {
        backgroundColor: color
      })

      setLayoutTest(change)
    }
  }
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (clickSection) {
        console.log(ev.target?.result)

        const l = storage.get()
        const change = changeSectionStyles(l, clickSection.id, {
          backgroundImage: ev.target?.result
        })

        setLayoutTest(change)
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const addToRowItem = () => {
    const l = storage.get()
    const newitems = {
      id: "dklfmqljfhmlgjq",
      text: "lorem text ipsum"
    }

    const newLayouts = addToRow(l, clickSection?.id, "dklfmqljfhmlgjq")
    setLayoutTest(newLayouts)
    setData((prev) => prev.concat(newitems))
  }
  const onFocus = (items: any) => {
    setFocusItem(items)
  }

  const addToItemss = () => {
    const newitems = {
      id: "dklfmqlj46346fhmlgjq",
      text: "lorem text ipsum"
    }
    const add = addToItem(layoutTest, newitems.id, {
      sectionId: focusItem.sectionId,
      columnId: focusItem.columnId,
      itemKey: focusItem.itemKey,
      rowId: focusItem.rowId
    })

    setLayoutTest(add)
    setData((prev) => prev.concat(newitems))
  }

  const imageCheckerFn = (items: any) => {
    return items.img ? true : false
  }
  const focus = useCallback((dat: any) => {
    setFocused(dat.id)
  }, [])
  const handleDelete = (id: number) => {}
  return (
    <div>
      <LayoutProvider>
        <LayoutContainer
          data={data}
          disableChange={disableChange}
          stableDataKey="id"
          layouts={layoutTest}
          staticComponent={staticss}
          maxColumns={2}
          onLayoutChange={handleLayoutChange}
          onClickSection={(section) => setclickSection(section)}
          onFocusItem={onFocus}
          imageCheckerFn={imageCheckerFn}
          imageSizeFnLoader={(item) => item.size}
          onImageResizeFinished={(item, w) => console.log(item, w)}
          renderComponent={(data) => {
            return (
              <TestComponent
                data={data}
                onClick={(d) => setFocused(d.id)}
                focused={data.id === focused}
                onDelete={handleDelete}
              />
            )
          }}
        />
      </LayoutProvider>
    </div>
  )
}
