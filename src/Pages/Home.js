import React,{ Suspense }  from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import Banner from '../Components/Banner/Banner'
import ErrorFallback from '../Components/ErrorBoundary';
// import CoinsTable from '../Components/CoinsTable'

const CoinsTable = React.lazy(() => import("../Components/CoinsTable"));

function Home() {
    return (
        <>
            <Banner />
            <ErrorBoundary
               FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}

             >
            <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
        </ErrorBoundary>
        </>
    )
}

export default Home
