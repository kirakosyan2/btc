import { GeneralAppErrorMessage } from '@components/_shared/GeneralAppErrorMessage';
import React, { PropsWithChildren } from 'react';

type State = {
    hasError: boolean;
};

type Props = PropsWithChildren;

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    onReload = () => {
        window.history.go(-1);
        window.location.reload();
    };

    render() {
        const { children } = this.props;

        if (this.state.hasError) {
            return (
                <GeneralAppErrorMessage
                    title="Упс... Произошла ошибка при работе с приложением"
                    comment="Попробуйте перезагрузить страницу"
                    buttonText="Назад"
                    onButtonClick={this.onReload}
                />
            );
        }

        return <>{children}</>;
    }
}

export { ErrorBoundary };
