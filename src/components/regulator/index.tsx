
interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string
}

export const Regulator: React.FC<Props> = ({title, ...rest}) => {
  return (
    <div>
      <label>
        {title}
        <input type="range"
          {...rest} />
      </label>
    </div>
  )
}
