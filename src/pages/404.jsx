import Layouts from "@/src/layouts/Layouts";

const E404 = () => {
  return (
    <Layouts darkHeader noFooter>
      <div className="page-404">
        <div className="container page-404__container">
          <div className="page-404__num">404</div>
          <h3 className="page-404__title">Page not found</h3>
          <div className="page-404__text app-text">We are unable to find the page you are looking for.</div>
        </div>
      </div>
    </Layouts>
  );
};
export default E404;
