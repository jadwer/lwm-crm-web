const Paginator = (props: any) => {
  const links = props.data.metaData.links;
  const first = props.data.metaData.first_page_url;
  const first_url = props.data.metaData.prev_page_url;
  const last = props.data.metaData.last_page_url;
  const last_url = props.data.metaData.next_page_url;
  const pageQuery = props.functions.pageQuery;
  let link = "";
  let classN: string = "";

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={first_url === null ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
                href="#"
                onClick={(e) => {
                  pageQuery(first);
                }}>
            Primero
          </a>
        </li>

        {links.map((page: any, key: number) => {
          classN = "page-item ";
          classN += page.active ? "active" : "";
          classN += page.url === null ? "disabled" : "";

          return (
            <li key={key} className={classN}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  pageQuery(page.url);
                }}>
                {<span  dangerouslySetInnerHTML={{__html: page.label}}></span>}
              </a>
            </li>
          );
        })}
        <li className={last_url === null ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              pageQuery(last);
            }}>
        Último
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginator;
