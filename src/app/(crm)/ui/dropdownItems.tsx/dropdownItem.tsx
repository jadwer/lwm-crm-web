const Paginator = (props: any) => {
  const links = props.data.links;
  const first = props.data.first;
  const first_url = props.data.first_url;
  const last = props.data.last;
  const last_url = props.data.last_url;
  let link = "";
  let classN: string  = "";

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">

        <li className={(first_url === null )? 'page-item disabled' : 'page-item'}>
          <a className="page-link" href={(first !== null)? `/dashboard/products/${first.split("=")[1]}` : "#"}>Primero</a>
        </li>

        {links.map((page: any, key : number) => {
        classN = "page-item ";
          classN += page.active ? "active" : "";
          classN += page.url === null ? "disabled" : "";

          link = (page.url !== null)? `/dashboard/products/${page.url.split("=")[1]}` : "#";
          return(
          <li key={key} className={classN}>
            <a className="page-link" href={link}>
              {page.label}
            </a>
          </li>
          );
        })}
        <li className={(last_url === null )? 'page-item disabled' : 'page-item'}>
          <a className="page-link" href={(last !== null)? `/dashboard/products/${last.split("=")[1]}` : "#"}>Último</a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginator;
