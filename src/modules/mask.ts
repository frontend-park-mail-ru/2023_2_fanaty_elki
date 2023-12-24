export class InputMask {
    private pattern: string;

    private target: HTMLInputElement;

    private back: boolean;
    private replacers: Set<string>;
    private accept: RegExp;
    private first: number;
    private prev: number[];

    constructor(
        pattern: string,
        replacer: string,
        allowed: string,
        target: HTMLInputElement,
    ) {
        this.target = target;
        this.back = false;

        this.pattern = pattern;
        this.replacers = new Set(replacer || "_");

        this.prev = ((j) => {
            return Array.from(pattern, (c, i) =>
                this.replacers.has(c) ? (j = i + 1) : j,
            );
        })(0);

        this.first = [...pattern].findIndex((c) => this.replacers.has(c));
        this.accept = new RegExp(allowed || "\\d", "g");

        this.bindEvents();
    }

    private clean(input) {
        input = input.match(this.accept) || [];
        return Array.from(this.pattern, (c) =>
            input[0] === c || this.replacers.has(c) ? input.shift() || c : c,
        );
    }

    private format() {
        const [i, j] = [
            this.target.selectionStart,
            this.target.selectionEnd,
        ].map((i) => {
            i = this.clean(this.target.value.slice(0, i)).findIndex((c) =>
                this.replacers.has(c),
            );
            return i < 0
                ? this.prev[this.prev.length - 1]
                : this.back
                ? this.prev[i - 1] || this.first
                : i;
        });
        this.target.value = this.clean(this.target.value).join``;
        this.target.setSelectionRange(i, j);
        this.back = false;
    }

    private bindEvents() {
        this.target.addEventListener(
            "keydown",
            (e) => (this.back = e.key === "Backspace"),
        );
        this.target.addEventListener("input", this.format.bind(this));
        this.target.addEventListener("focus", this.format.bind(this));
        this.target.addEventListener(
            "blur",
            () =>
                this.target.value === this.pattern && (this.target.value = ""),
        );
    }
}
