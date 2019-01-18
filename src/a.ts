export abstract class A {
    private a: string;
    constructor(a: string) {
      this.a = a;
    }
    get A() {return this;}
    async test():Promise<string> {return 'A'}
    t() {return 'ta'}
}
