
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="rgb(236, 228, 236)" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
}

export default Loader;