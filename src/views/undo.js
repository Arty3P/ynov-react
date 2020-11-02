import React, { useReducer } from 'react';

import { Header } from '../components/header'
import { UndoButton } from '../components/undo/button'
import { UndoInput } from '../components/undo/input'

const Undo = () => {

    const initialState = {
        past: [],
        present: "",
        futur: [],
    };

    const inputReducer = (state, action) => {
        switch(action.type) {
            case 'inputChange':
                return {
                    ...state,
                    past: [...state.past, state.present],
                    present: action.text,
                    futur: []
                }
            case 'undo':
                return {
                    ...state,
                    past: state.past.slice(0, state.past.length - 1),
                    present: state.past[state.past.length - 1],
                    futur: [...state.futur, state.present],
                }
            case 'redo':
                return {
                    ...state,
                    past: [...state.past, state.futur[state.futur.length - 1]],
                    present: state.futur[state.futur.length - 1],
                    futur: state.futur.slice(0, state.futur.length - 1)
                }
            case 'reset':
                return initialState
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(inputReducer, initialState);

    const inputChange = (value) => {
        dispatch({ type: 'inputChange', text: value })
    }

    const buttonUndo = () => {
        dispatch({ type: 'undo' })
    }

    const buttonRedo = () => {
        dispatch({ type: 'redo' })
    }

    const buttonReset = () => {
        dispatch({ type: 'reset' })
    }

    return(
        <div id="undo">
            <Header />
            <div className="ui container" style={{ padding: '1rem 0' }}>
                <div className="ui grid">
                    <UndoButton text="UNDO" color="green" onClick={buttonUndo} active={state.past.length > 0 ? true : false} />
                    <UndoButton text="REDO" color="violet" onClick={buttonRedo} active={state.futur.length > 0 ? true : false} />
                    <UndoButton text="RESET" color="red" onClick={buttonReset} active />
                </div>
                <br />
                <UndoInput onChange={(e) => inputChange(e.target.value)} value={state.present} />
                <pre>
                    PAST : {state.past.join('; ')}
                </pre>
                <pre>
                    PRESENT : {state.present}
                </pre>
                <pre>
                    FUTUR : {state.futur.join('; ')}
                </pre>
                <pre>
                    {JSON.stringify(state)}
                </pre>
            </div>
        </div>
    )

}

export { Undo }
