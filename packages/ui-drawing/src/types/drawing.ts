export interface Point {
    x: number; // Normalized 0-1
    y: number; // Normalized 0-1
}

export interface Zone {
    id: string;
    points: Point[];
    type: 'include' | 'exclude';
    color?: string;
    label?: string;
}

export interface Line {
    id: string;
    start: Point;
    end: Point;
    direction: 'unidirectional' | 'bidirectional';
    label?: string;
}

export interface DrawingCanvasProps {
    width?: number;
    height?: number;
    backgroundImage?: string;
    children?: React.ReactNode;
    className?: string;
    onMouseDown?: (point: Point) => void;
    onMouseMove?: (point: Point) => void;
    onMouseUp?: (point: Point) => void;
}
