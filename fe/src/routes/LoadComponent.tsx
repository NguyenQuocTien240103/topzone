import { Suspense } from 'react';

// import { LoadingOverlay } from '/components';

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    // <Suspense fallback={<LoadingOverlay />}>
    //     <Component />
    // </Suspense>

    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

export default LoadComponent;
