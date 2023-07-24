import { FC } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import * as Select from '@radix-ui/react-select'
import { StreetViewCoverageType } from '@types'
import { StyledSelectCoverage } from './'

type Props = {
  coverageOptions: StreetViewCoverageType[]
  onChange: (selectedPano: string) => void
}

const SelectCoverage: FC<Props> = ({ coverageOptions, onChange }) => {
  const currentPanorama = coverageOptions.find((option) => option.isCurrent)

  return (
    <StyledSelectCoverage>
      <Select.Root onValueChange={onChange}>
        <Select.Trigger className="SelectTrigger" aria-label="Streetview Coverage">
          <Select.Value placeholder={currentPanorama?.date} />
          <Select.Icon className="SelectIcon">
            <SelectorIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <StyledSelectCoverage>
            <Select.Content className="SelectContent" position="popper" sideOffset={5} align="end">
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  <Select.Label className="SelectLabel">Specific Panorama</Select.Label>

                  {coverageOptions.map((coverage) => (
                    <Select.Item key={coverage.pano} value={coverage.pano} className="SelectItem">
                      <Select.ItemText>{coverage.date}</Select.ItemText>

                      <Select.ItemIndicator className="SelectItemIndicator">
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>

                {currentPanorama && (
                  <>
                    <Select.Separator className="SelectSeparator" />

                    <Select.Group>
                      <Select.Label className="SelectLabel">Current / Auto-Updating</Select.Label>

                      <Select.Item value="auto-update" className="SelectItem">
                        <Select.ItemText>{currentPanorama.date}</Select.ItemText>
                        <Select.ItemIndicator className="SelectItemIndicator">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Group>
                  </>
                )}
              </Select.Viewport>
            </Select.Content>
          </StyledSelectCoverage>
        </Select.Portal>
      </Select.Root>
    </StyledSelectCoverage>
  )
}

export default SelectCoverage
