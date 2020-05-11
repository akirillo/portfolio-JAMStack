import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProjectTemplate = ({
  content,
  contentComponent,
  title,
  logo,
  startDate,
  endDate,
  images,
  links,
  technologies,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      <div className="meta">
        <div className="brand">
            <div className="logo">
                <PreviewCompatibleImage
                    imageInfo={{
                        image: logo,
                        alt: `${title} logo`,
                        style: {
                        height: "3rem",
                        width: "3rem"
                        }
                    }}
                />
            </div>
          <h2 className="project">{title}</h2>
          <h5 className="time">{startDate}{endDate ? ` - ${endDate}` : null} </h5>
        </div>
      </div>
      <div className="slide-content">
        <PostContent content={content} />
        <div className="media">
          {
            images.map((image, i) => (
                <a key={i} href={links[i]} target="_blank" rel="noopener noreferrer">
                    <PreviewCompatibleImage
                    imageInfo={{
                        image,
                        alt: "oops",
                        style: {
                        height: "144px",
                        width: "256px"
                        }
                    }}
                    />
              </a>
            ))
          }
        </div>
        <div className="technologies">
          { technologies ?
            technologies.map((technology, i) => (
              <Link key={i} to={`/technologies/${kebabCase(technology)}/`}>{technology}</Link>
            )) : null
          }
        </div>
      </div>
    </section>
  )
}

ProjectTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  images: PropTypes.array,
  links: PropTypes.array,
  technologies: PropTypes.array,
  helmet: PropTypes.object,
}

const Project = ({ data }) => {
  const { markdownRemark: project } = data
  return (
    <Layout>
      <ProjectTemplate
        content={project.html}
        contentComponent={HTMLContent}
        title={project.frontmatter.title}
        logo={project.frontmatter.logo}
        startDate={project.frontmatter.startDate}
        endDate={project.frontmatter.endDate && project.frontmatter.endDate}
        images={project.frontmatter.images && project.frontmatter.images}
        links={project.frontmatter.links && project.frontmatter.links}
        technologies={project.frontmatter.technologies && project.frontmatter.technologies}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${project.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${project.frontmatter.title}: A project by Andrew Kirillov.`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        logo {
            childImageSharp {
                fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                }
            }
        }
        startDate(formatString: "MMM YYYY")
        endDate(formatString: "MMM YYYY")
        images {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        links
        technologies
      }
    }
  }
`