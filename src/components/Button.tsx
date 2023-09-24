import { Show } from "solid-js";

export default function Button(props: {toggle: boolean, increment: () => void, count: number})  {
    return (
        <>
        <Show when={props.toggle}>
            <button onClick={props.increment}>Click Me</button>
            <p>You clicked {props.count} times</p>
        </Show>
        </>
    );
}