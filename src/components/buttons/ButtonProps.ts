type ButtonType = 'primary' | 'danger'

export interface ButtonProps {
    onClick: () => void
    type?: ButtonType
    disabled?: boolean
}
