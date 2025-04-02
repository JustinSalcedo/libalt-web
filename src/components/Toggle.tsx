import styled from 'styled-components'

// Toggle component
const Toggle = ({
    isOn,
    handleToggle,
}: {
    isOn: boolean
    handleToggle: () => void
}) => {
    return (
        <ToggleContainer>
            <ToggleSwitch onClick={handleToggle}>
                <ToggleCircle
                    $isOn={isOn}
                    style={{left: isOn ? 'calc(100% - 25px)' : '8%'}}
                />
            </ToggleSwitch>
        </ToggleContainer>
    )
}

export default Toggle

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`

const ToggleSwitch = styled.div`
    position: relative;
    width: 60px;
    height: 1.5rem;
    background-color: #222;
    border-radius: 15px;
    cursor: pointer;
`

const ToggleCircle = styled.div<{$isOn?: boolean}>`
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: ${({$isOn}) => ($isOn ? '#eee' : '#777')};
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
`
