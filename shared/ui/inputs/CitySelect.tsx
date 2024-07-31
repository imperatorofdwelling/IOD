'use client'
import useCities from 'shared/hooks/useCities'
import Select from 'react-select'

export type CitiesSelectValue = {
  value: string
  district: string
  subject: string
  coordsLat: number
  coordsLon: number
}

interface CitySelect {
  value?: CitiesSelectValue
  onChange: (value: CitiesSelectValue) => void
}

const CitySelect: React.FC<CitySelect> = ({ value, onChange }) => {
  const { getAll } = useCities()

  return (
    <div>
      <Select
        className='text-neutral-900'
        value={value}
        placeholder="Город"
        isClearable
        options={getAll()}
        onChange={(value) => onChange(value as CitiesSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row text-black items-center gap-3">
            <div>
              {option.value},
              <span className="text-neutral-900 ml-1 text-black dark:text-black">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#e2e2e2',
          },
        })}
      />
    </div>
  )
}

export default CitySelect
