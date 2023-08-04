import { Col } from "react-bootstrap";

export const ProjectCard = ({ project }) => {
  const { name, description, tags, image, source_code_link, webPageLink } =
    project;
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx ">
        <img src={image} />
        <div className="proj-txtx">
          <h4 className="text-white">{name}</h4>
          <span>{description}</span>
          <div className="d-flex justify-content-between align-items-center tag_name">
          {tags.map((tag) => (
            <p >
              <span className="">#</span>{tag.name}
            </p>
          ))}
          </div>
          <div className="d-flex justify-content-around mb-2 links">
            <a href={source_code_link}>RepoLink</a>
            <a href={webPageLink}>WebLink</a>
          </div>
        </div>
      </div>
    </Col>
  );
};
