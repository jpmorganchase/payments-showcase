import React, { useEffect } from 'react';
import StatusTable from '../components/statusTable';
import Spinner from '../components/spinner';
import useGet from '../hooks/useGet';
import { AppContext } from '../AppContext';

const mockedData = require('../mockedJson/uf-service-status.json');
const { config } = require('../config');
const ServiceStatusPage = () => {
  const [data, setData] = React.useState(mockedData);
  const { statusConfig } = config;
  const { displayingMockedData, displayingApiData } =
    React.useContext(AppContext);
  const response = useGet(
    statusConfig.apiDetails[0].backendPath,
    statusConfig.apiDetails[0].cacheKey,
    statusConfig.apiDetails[0].refreshInterval,
    displayingMockedData,
  );

  useEffect(() => {
    if (displayingMockedData) {
      setData(mockedData);
    } else {
      setData(response?.data);
    }
  }, [displayingMockedData]);

  const displayTable = () => {
    if (
      !displayingMockedData &&
      (!response || response.status === 'loading' || response.isFetching)
    ) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else {
      return (
        <StatusTable
          serviceStatusData={data}
          apiData={statusConfig.apiDetails}
          displayingApiData={displayingApiData}
        />
      );
    }
  };

  return (
    <div className='relative p-8'>
      <h2 className='text-2xl font-medium mb-4'>Service status</h2>
      <div className='overflow-auto '>{displayTable()}</div>
    </div>
  );
};

export default ServiceStatusPage;
