import { Canvas } from "../components/Canvas";
import { Channel } from "../components/Channel";
import { ScoreBoard } from "../components/ScoreBoard";
import { Tools } from "../components/Tools";
import { WordGenerator } from "../components/WordGenerator";

export const Game = () => {
    return (
        <div className='grid grid-cols-7 gap-3'>
            <WordGenerator />
            <Canvas />
            <Tools />
            <ScoreBoard />
            <Channel />
        </div>
    );
}