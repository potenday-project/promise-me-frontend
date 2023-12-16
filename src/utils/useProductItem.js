import useFetchData from '@/hooks/useFetchData';

const getEndpoint = (meetingId) =>
  `${import.meta.env.VITE_PB_API}/collections/products/records/${meetingId}`;

function useProductItem(meetingId) {
  const responseData = useFetchData(getEndpoint(meetingId));
  return responseData;
}

export default useProductItem;
