import { Column } from 'react-table';
import { ClaimsAndRepairsDetails, FormAction, FormState, NextPageWithLayoutProps } from 'typings';
import { Reducer, useMemo, useReducer, useState } from 'react';
import DaaboTable from 'components/lib/daabo-table';
import { BsPlusSquareFill } from 'react-icons/bs';
import RepairDetailCard from 'components/claims-repairs/repair-detail-card';
import ClaimRequestForm from 'components/claims-repairs/claim-request-form';
import Seo from 'lib/seo';
import SearchBar from 'components/lib/forms/search-bar';

const formReducer: Reducer<FormState, FormAction> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.data };
    case 'SET_DETAILS':
      return { ...state, details: action.data };
    case 'SET_DEVICE_NAME':
      return { ...state, deviceName: action.data };
    case 'SET_FIXED_BEFORE':
      return { ...state, fixedBefore: action.data };
    case 'SET_INCIDENT':
      return { ...state, incident: action.data };
    case 'SET_INCIDENT_DATE':
      return { ...state, incidentDate: action.data };
    case 'SET_INCIDENT_LOCATION':
      return { ...state, incidentLocation: action.data };
    case 'SET_OCCURED_BEFORE':
      return { ...state, occuredBefore: action.data };
    case 'SET_DAMAGE_IMAGE':
      return { ...state, damageImage: action.data };
    case 'SUBMIT':
      return state;
    default:
      return state;
  }
};

const ClaimsAndRepairs: NextPageWithLayoutProps = () => {
  const [formOpen, setFormOpen] = useState(false);
  const columns = useMemo<Column<ClaimsAndRepairsDetails>[]>(
    () => [
      {
        Header: 'ORDER ID',
        accessor: 'orderId',
        minWidth: 30,
        width: 100,
        maxWidth: 200,
        Cell: (props) => <span className="uppercase text-daabo-primary">{props.value}</span>,
      },
      {
        Header: 'DATE',
        accessor: 'date',
        minWidth: 30,
        width: 150,
        maxWidth: 200,
        Cell: (props) => <span className="text-daabo-grey">{props.value}</span>,
      },
      {
        Header: 'DEVICE',
        accessor: 'device',
        minWidth: 30,
        width: 75,
        maxWidth: 200,
        Cell: (props) => <span className="font-medium">{props.value}</span>,
      },
      {
        Header: 'ISSUE',
        accessor: 'issue',
        minWidth: 30,
        width: 75,
        maxWidth: 200,
        Cell: (props) => <span className="font-semibold">{props.value}</span>,
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        minWidth: 30,
        width: 70,
        maxWidth: 200,
        Cell: (props) => (
          <span
            className={`capitalize ${
              props.value === 'pending'
                ? 'text-[#ffc107]'
                : props.value === 'approved'
                ? 'text-[#4caf50]'
                : 'text-[#c70000]'
            }`}
          >
            {props.value}
          </span>
        ),
      },
      {
        Header: 'ACTION',
        id: 'viewButton',
        Cell: (props: any) => <RepairDetailCard id={props.row.values.orderId} />,
        minWidth: 30,
        width: 50,
        maxWidth: 100,
      },
    ],
    []
  );
  const [formState, dispatch] = useReducer(formReducer, {
    deviceName: '',
    incident: '',
    incidentDate: '',
    occuredBefore: false,
    fixedBefore: false,
    incidentLocation: '',
    currentLocation: '',
    details: '',
    damageImage: undefined,
  });

  const openModal = () => {
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Seo title="Claims and Repairs" description="Manage your claim and repairs requests" />
      <div>
        <div className="w-full py-12">
          <div className="flex w-full flex-col justify-between gap-y-3 sm:flex-row">
            <div>
              <h1 className="text-lg font-semibold">Claims and Repairs</h1>
              <span className="text-xs font-medium text-[#5f5f5f]">
                You have made a total of 0 claims and repairs
              </span>
            </div>
            <button
              className="daabo-primary-button flex h-12 max-w-[11.500rem] items-center justify-center gap-[0.375rem] sm:max-w-none"
              onClick={openModal}
            >
              <BsPlusSquareFill className="text-base" />
              <span>Make a request</span>
            </button>
          </div>
          <SearchBar />
          <div className="mt-9 w-full">
            <DaaboTable columns={columns} data={[]} />
          </div>
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 rounded-lg bg-[#e5e5e5] p-4 text-daabo-grey hover:bg-[#d3d3d3]">
              Show more{' '}
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75028 6.69288C1.71767 6.66104 1.69177 6.62298 1.67411 6.58096C1.65645 6.53894 1.64739 6.4938 1.64746 6.44822C1.64753 6.40264 1.65673 6.35754 1.67452 6.31557C1.69231 6.27361 1.71832 6.23563 1.75103 6.20388L5.73878 2.31738C5.80881 2.24912 5.90273 2.21092 6.00053 2.21092C6.09832 2.21092 6.19225 2.24912 6.26228 2.31738L10.25 6.20388C10.2827 6.23568 10.3086 6.2737 10.3264 6.31569C10.3441 6.35768 10.3532 6.4028 10.3532 6.44838C10.3532 6.49396 10.3441 6.53908 10.3264 6.58107C10.3086 6.62307 10.2827 6.66108 10.25 6.69288C10.1831 6.7583 10.0932 6.79492 9.99953 6.79492C9.90591 6.79492 9.816 6.7583 9.74903 6.69288L6.00053 3.03813L2.25053 6.69288C2.18359 6.75807 2.09384 6.79456 2.0004 6.79456C1.90697 6.79456 1.81722 6.75807 1.75028 6.69288ZM1.75028 9.69288C1.71767 9.66104 1.69177 9.62298 1.67411 9.58096C1.65645 9.53894 1.64739 9.4938 1.64746 9.44822C1.64753 9.40264 1.65673 9.35754 1.67452 9.31557C1.69231 9.27361 1.71832 9.23563 1.75103 9.20388L5.73878 5.31738C5.80881 5.24912 5.90273 5.21092 6.00053 5.21092C6.09832 5.21092 6.19225 5.24912 6.26228 5.31738L10.25 9.20388C10.2827 9.23568 10.3086 9.2737 10.3264 9.31569C10.3441 9.35768 10.3532 9.4028 10.3532 9.44838C10.3532 9.49396 10.3441 9.53908 10.3264 9.58107C10.3086 9.62307 10.2827 9.66108 10.25 9.69288C10.1831 9.7583 10.0932 9.79492 9.99953 9.79492C9.90591 9.79492 9.816 9.7583 9.74903 9.69288L6.00053 6.03813L2.25053 9.69288C2.18359 9.75807 2.09384 9.79456 2.0004 9.79456C1.90697 9.79456 1.81722 9.75807 1.75028 9.69288Z"
                  fill="#777777"
                />
              </svg>
            </button>
          </div>
        </div>
        <ClaimRequestForm
          state={formState}
          dispatch={dispatch}
          isOpen={formOpen}
          close={closeModal}
        />
      </div>
    </>
  );
};

ClaimsAndRepairs.layoutProps = {
  isAuthenticated: true,
};

export default ClaimsAndRepairs;
