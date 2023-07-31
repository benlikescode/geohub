import { FC } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import * as Select from '@radix-ui/react-select'
import { StyledSelectMapLayers } from './'

const OVERLAY_OPTIONS = ['Default Map', 'Satellite', 'Terrain']

type Props = {
  selectionMap: google.maps.Map
}

const SelectMapLayers: FC<Props> = ({ selectionMap }) => {
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
              </Select.Viewport>
            </Select.Content>
          </StyledSelectMapLayers>
        </Select.Portal>
      </Select.Root>
    </StyledSelectMapLayers>
  )
}

export default SelectMapLayers
