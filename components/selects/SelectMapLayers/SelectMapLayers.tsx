import { FC, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Slider } from '@components/system'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import * as Select from '@radix-ui/react-select'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { setCoverageOpacity } from '@redux/slices'
import { StyledSelectMapLayers } from './'

// const THICKER_BORDER_OUTLINE = [
//   {
//     featureType: 'administrative.country',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         weight: 1.5,
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.province',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         weight: 3.5,
//       },
//     ],
//   },
// ]

const OVERLAY_OPTIONS = ['Default Map', 'Satellite', 'Terrain']
// const THICKNESS_OPTIONS = ['Thicker borders', 'Thicker coverage']

type Props = {
  selectionMap: google.maps.Map
}

const SelectMapLayers: FC<Props> = ({ selectionMap }) => {
  const [opacity, setOpacity] = useState(0)
  const mapMaker = useAppSelector((state) => state.mapMaker)
  const dispatch = useAppDispatch()

  //   const OverlayOpacityStyle = createGlobalStyle`
  //   .selection-map > div > div > div > div > div > div > div > div > div > div > img {
  //       opacity: ${opacity};
  //     }
  // `

  const handleChange = (value: string) => {
    if (value === 'Default Map') {
      selectionMap.setMapTypeId('roadmap')
    }

    if (value === 'Satellite') {
      selectionMap.setMapTypeId('satellite')
    }

    if (value === 'Terrain') {
      selectionMap.setMapTypeId('terrain')
    }

    // if (value === 'Thicker borders') {
    //   selectionMap.setOptions({ styles: THICKER_BORDER_OUTLINE })
    // }
  }

  return (
    <StyledSelectMapLayers>
      <Select.Root onValueChange={handleChange} defaultValue={OVERLAY_OPTIONS[0]}>
        <Select.Trigger className="SelectTrigger" aria-label="Selection Map Layer Customization">
          <Select.Value placeholder={OVERLAY_OPTIONS[0]} />
          <Select.Icon className="SelectIcon">
            <SelectorIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <StyledSelectMapLayers>
            <Select.Content className="SelectContent" position="popper" sideOffset={5}>
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  <Select.Label className="SelectLabel">Overlay Types</Select.Label>

                  {OVERLAY_OPTIONS.map((option) => (
                    <Select.Item key={option} value={option} className="SelectItem">
                      <Select.ItemText>{option}</Select.ItemText>

                      <Select.ItemIndicator className="SelectItemIndicator">
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>

                {/* <Select.Separator className="SelectSeparator" />

                <Select.Group>
                  <Select.Label className="SelectLabel">Line Thickness</Select.Label>

                  {THICKNESS_OPTIONS.map((option) => (
                    <Select.Item key={option} value={option} className="SelectItem">
                      <Select.ItemText>{option}</Select.ItemText>

                      <Select.ItemIndicator className="SelectItemIndicator">
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>

                <Select.Group>
                  <Select.Label className="SelectLabel">Opacity</Select.Label>

                  <Slider
                    min={0}
                    max={100}
                    value={opacity * 100}
                    onChange={(newOpacity) => setOpacity(newOpacity / 100)}
                  />
                </Select.Group> */}
              </Select.Viewport>
            </Select.Content>
          </StyledSelectMapLayers>
        </Select.Portal>
      </Select.Root>
    </StyledSelectMapLayers>
  )
}

export default SelectMapLayers
