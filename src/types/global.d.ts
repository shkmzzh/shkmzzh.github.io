interface CSSPaintWorklet {
  addModule(moduleURL: string): void;
}

interface CSS {
  paintWorklet?: CSSPaintWorklet;
}
