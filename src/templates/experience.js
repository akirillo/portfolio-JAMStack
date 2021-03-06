import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import SlideContentTemplate from '../components/SlideContent'

const Experience = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SlideContentTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        logo={post.frontmatter.logo}
        startDate={post.frontmatter.startDate}
        endDate={post.frontmatter.endDate ? post.frontmatter.endDate : null}
        images={post.frontmatter.images.length > 0 ? post.frontmatter.images : null}
        links={post.frontmatter.links}
        technologies={post.frontmatter.technologies}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title} Experience`}</title>
            <meta
              name="description"
              content={`Andrew Kirillov's experience working at ${post.frontmatter.title}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Experience.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Experience

export const pageQuery = graphql`
  query ExperienceByID($id: String!) {
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
