export default function Logs({ logs }) {
    return <ol id="log">{logs.map(info => <li className="" key={`${info.square.row}+${info.square.col}`}>{info.player} selected {info.square.row},{info.square.col}</li>)}</ol>
}