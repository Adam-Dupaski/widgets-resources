import { createElement, ReactNode, useCallback } from "react";
import { hot } from "react-hot-loader/root";
import { ValueStatus } from "mendix";

import { FieldsetContainerProps } from "../typings/FieldsetProps";

const Fieldset = (props: FieldsetContainerProps): ReactNode => {
    const { legend, content, name, tabIndex, style, class: className } = props;

    const renderLegend = useCallback(() => {
        if (
            !legend ||
            legend.status === ValueStatus.Unavailable ||
            (legend.status === ValueStatus.Loading && !legend.value)
        ) {
            return null;
        }

        return <legend>{legend.value}</legend>;
    }, [legend]);

    return (
        <fieldset name={name} tabIndex={tabIndex} style={style} className={className}>
            {renderLegend()}
            {content}
        </fieldset>
    );
};

export default hot(Fieldset);
