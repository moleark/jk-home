import * as React from 'react';

export abstract class ViewBase<T> {
    model: T;
    abstract render():JSX.Element;
}
