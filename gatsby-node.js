const kebabCase = require(`lodash.kebabcase`);

const options = {
  basePath: '/',
  projectsPath: 'content/projects',
  projectsUrl: '/projects',
  projectsPrefix: '/',
  pagesPath: 'content/pages',
  formatString: 'DD.MM.YYYY',
  navigation: [
    { name: 'About', slug: '/about' },
    { name: 'Career', slug: '/career' },
    { name: 'Hobby', slug: '/hobby' },
    { name: 'Skill', slug: '/skill' },
    { name: 'Projects', slug: '/project-list' },
  ],
  mdx: true,
  sharp: true,
};

const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType('Mdx');
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;
  const slugify = (source) => {
    const slug = source.slug ? source.slug : kebabCase(source.title);
    return `/${slug}`;
  };

  createFieldExtension({
    name: 'slugify',
    extend() {
      return {
        resolve: slugify,
      };
    },
  });

  createFieldExtension({
    name: 'mdxpassthrough',
    args: {
      fieldName: 'String!',
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createFieldExtension({
    name: 'defaultFalse',
    extend() {
      return {
        resolve(source, _args, _context, info) {
          if (source[info.fieldName] == null) {
            return false;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createTypes(`
    interface Project implements Node {
      id: ID!
      title: String!
      shortTitle: String!
      category: String!
      slug: String! @slugify
      displayOrder: Int!
      date: Date! @dateformat
      color: String
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      defer: Boolean @defaultFalse
      body: String!
    }

    type MdxProject implements Node & Project {
      title: String!
      shortTitle: String!
      category: String!
      slug: String! @slugify
      displayOrder: Int!
      date: Date! @dateformat
      color: String
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      defer: Boolean @defaultFalse
      body: String! @mdxpassthrough(fieldName: "body")
    }

    interface Page implements Node {
      id: ID!
      title: String!
      slug: String!
      displayOrder: Int!
      color: String
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      defer: Boolean @defaultFalse
      custom: Boolean @defaultFalse
      body: String!
    }

    type MdxPage implements Node & Page {
      title: String!
      slug: String!
      displayOrder: Int!
      color: String
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      defer: Boolean @defaultFalse
      custom: Boolean @defaultFalse
      body: String!  @mdxpassthrough(fieldName: "body")
    }

    type PortfolioConfig implements Node {
      navigation: [navigationEntry!]
    }

    type navigationEntry {
      name: String
      slug: String
    }
`);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === options.projectsPath) {
    const fieldData = {
      title: node.frontmatter.title,
      shortTitle: node.frontmatter.shortTitle,
      slug: node.frontmatter.slug,
      displayOrder: node.frontmatter.displayOrder,
      category: node.frontmatter.category,
      color: node.frontmatter.color ? node.frontmatter.color : undefined,
      cover: node.frontmatter.cover,
      date: node.frontmatter.date,
      defer: node.frontmatter.defer,
    };

    const mdxProjectId = createNodeId(`${node.id} >>> MdxProject`);

    createNode({
      ...fieldData,
      id: mdxProjectId,
      parent: node.id,
      children: [],
      internal: {
        type: 'MdxProject',
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: 'Mdx implementation of the Project interface',
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxProjectId) });
  }

  if (source === options.pagesPath) {
    const fieldData = {
      title: node.frontmatter.title,
      slug: `/${node.frontmatter.slug}`,
      displayOrder: node.frontmatter.displayOrder,
      color: node.frontmatter.color ? node.frontmatter.color : undefined,
      custom: node.frontmatter.custom,
      cover: node.frontmatter.cover,
      defer: node.frontmatter.defer,
    };

    const mdxPageId = createNodeId(`${node.id} >>> Page`);

    createNode({
      ...fieldData,
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: 'MdxPage',
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: 'Mdx implementation of the Page interface',
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

exports.sourceNodes = ({ actions, createContentDigest }) => {
  const { createNode } = actions;

  const portfolioConfig = {
    projectsPrefix: options.projectsPrefix,
    basePath: options.basePath,
    formatString: options.formatString,
    navigation: options.navigation,
    pagesPath: options.pagesPath,
    projectsPath: options.projectsPath,
    projectsUrl: options.projectsUrl,
  };

  createNode({
    ...portfolioConfig,
    id: 'portfolio-config',
    parent: null,
    children: [],
    internal: {
      type: 'PortfolioConfig',
      contentDigest: createContentDigest(portfolioConfig),
      content: JSON.stringify(portfolioConfig),
      description: 'Options for our portfolio',
    },
  });
};

const homepageComponent = require.resolve('./src/pages/Homepage.tsx');
const pageComponent = require.resolve('./src/pages/Page.tsx');
const projectComponent = require.resolve('./src/pages/Project.tsx');
const projectsComponent = require.resolve('./src/pages/Projects.tsx');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  createPage({
    path: options.basePath,
    component: homepageComponent,
  });

  createPage({
    path: '/project-list',
    component: projectsComponent,
  });

  const result = await graphql(
    `
      query {
        allProject {
          nodes {
            slug
            defer
            ... on MdxProject {
              parent {
                ... on Mdx {
                  parent {
                    ... on File {
                      relativeDirectory
                    }
                  }
                }
              }
            }
          }
        }
        allPage {
          nodes {
            slug
            defer
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild('There was an error loading your projects or pages', result.errors);
    return;
  }

  const projects = result.data.allProject.nodes;

  if (projects.length > 0) {
    projects.forEach((project) => {
      createPage({
        path: project.slug,
        component: projectComponent,
        context: {
          slug: project.slug,
          formatString: options.formatString,
          relativeDirectory: project.parent.parent.relativeDirectory,
        },
        defer: project.defer,
      });
    });
  }

  const pages = result.data.allPage.nodes;

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: page.slug,
        component: pageComponent,
        context: {
          slug: page.slug,
        },
        defer: page.defer,
      });
    });
  }
};
