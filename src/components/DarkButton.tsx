import styled from 'styled-components'

type ButtonType = 'primary' | 'danger'

// blue styled DarkButton component
const DarkButton = styled.button<{disabled?: boolean; type?: ButtonType}>`
    background-color: ${({disabled, type}) =>
        disabled ? '#3e3e3e' : type === 'danger' ? '#c61584' : 'blue'};
    color: azure;
    border-radius: 4px;
    border-color: ${({disabled, type}) =>
        disabled ? 'gray' : type === 'danger' ? 'maroon' : '#2424ff'};
`

export default DarkButton
