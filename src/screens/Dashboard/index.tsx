import Link from "next/link";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { GROCERY_LISTS } from "constants/route";

function Dashboard() {
  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Technical Task Solution
        </Typography>
        <Typography>
          This page has not been refactored yet. I created it to share my
          thoughts and initial approach to solving the technical task. Its a
          draft where I outline the architecture, performance considerations,
          and handling of server-side issues. The content will be refined and
          optimized in future iterations.
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              1. Architecture Selection
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              I chose this application architecture because it follows best
              practices, ensuring scalability, maintainability, and a clean
              separation of concerns.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              2. Application Architecture
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText
                  primary="app"
                  secondary="This folder contains the core logic for each route within the Next.js application. The routing and basic structure are defined here to keep the routing logic separate from the content."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="screens"
                  secondary="This folder contains the content of each page, along with its styles and specific components. Some pages also have their own components folder, which includes specialized components used exclusively on that page. This approach helps maintain a modular design by isolating page-specific logic and avoiding clutter in the shared component folder."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="components"
                  secondary="A collection of shared components that can be reused across different pages and containers. This promotes code reuse and consistency throughout the app."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="constant"
                  secondary="A dedicated folder for application constants, currently containing a query store. This can be expanded to manage different types of constants as the application grows."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="theme"
                  secondary="This folder houses the common styles used across the application. By centralizing the styling here, we ensure that design and styling are consistent and easy to maintain."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="validation"
                  secondary=" A folder for validation rules. This allows us to keep validation logic separate and reusable across different parts of the app."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="api"
                  secondary="This folder handles API interactions. It contains an index.js file that serves as the main fetcher, abstracting the underlying implementation. Currently, Axios is used, but the architecture allows for easily integrating different providers in the future. The grocery.js file contains all the API requests related to the application’s functionality."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="utilities"
                  secondary="This folder contains helper functions. I created this folder to move logic out of components that can be reused in the future if needed. It helps keep the components lightweight and focuses them on rendering and user interactions, while more complex or repetitive logic is abstracted into these helper functions."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              3. Page Loading Types
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="h6">
              I implemented two routes: <mark>grocery/lists</mark> and
              <mark>grocery/list/:id</mark>. Each route uses a different page
              loading strategy:
            </Typography>

            <br />
            <Typography variant="h6">
              <mark>grocery/lists</mark>- this page loads data from the client
              side.
            </Typography>

            <Typography>
              <b>Advantages</b>
            </Typography>
            <Typography>
              - Provides good performance for metrics like First Contentful
              Paint and Speed Index.
            </Typography>
            <Typography> - Uses static metadata for SEO.</Typography>

            <Typography>
              <b>Disadvantages</b>
            </Typography>
            <Typography>
              - The page loads first, and then the lists are fetched, causing a
              delay before the user can interact with them. This delay isnt
              ideal for SEO because search engines might not wait for the
              content to load.
            </Typography>

            <br />
            <Typography variant="h6" component="h2">
              <mark>grocery/list/</mark>- this page uses server-side rendering
              (SSR).
            </Typography>
            <Typography>
              <b>Advantages</b>
            </Typography>
            <Typography>
              - Users can see the content immediately since the page is rendered
              on the server.
            </Typography>
            <Typography>
              - This method is better for SEO since the content is already
              available when the page loads.
            </Typography>
            <Typography>
              - It allows for dynamic metadata, such as custom page titles,
              which are fetched from the server.
            </Typography>

            <Typography>
              <b>Disadvantages</b>
            </Typography>
            <Typography>
              - It takes more time to load the page because of server-side
              processing.
            </Typography>
            <Typography>
              - It decreases performance metrics like First Contentful Paint and
              Speed Index due to the time needed to fetch data.
            </Typography>

            <br />
            <Typography variant="h6" component="h2">
              Caching Strategy
            </Typography>
            <Typography>
              For the <mark>grocery/list/:id</mark> page, I optimized
              performance by calling the <mark>loadingData()</mark> function
              twice: once to load the page and again to generate metadata. After
              this, the data is cached, and future requests use the cached data
              to generate the metadata, reducing the load time for subsequent
              requests.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              4. Performance Considerations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              I want to highlight two specific cases where I optimized
              performance:
            </Typography>
            <Typography variant="h6" component="h3">
              1) GroceryListItem Component
            </Typography>
            <Typography variant="body1" gutterBottom>
              The <mark>GroceryListItem</mark> component is wrapped in
              React.memo(), , with a custom comparison function that checks
              whether the items ID has changed. This helps avoid unnecessary
              re-renders by only re-rendering the component when its ID changes.
              This optimization reduces CPU load by preventing useless
              re-renders for items that remain unchanged in the list.
            </Typography>
            <Typography variant="h6" component="h3">
              2) ListItem Component
            </Typography>
            <Typography variant="body1" gutterBottom>
              The <mark>ListItem</mark> component also uses React.memo() to
              prevent unnecessary re-renders. This is particularly important
              when the user interacts with individual list elements (e.g.,
              checking an item), as it ensures only the specific item being
              interacted with is re-rendered, while other list items remain
              unaffected.
            </Typography>
            <Typography>
              Regarding the <mark>checkedItem</mark> function, which is passed
              to <mark>ListItem</mark>: this function calls{" "}
              <mark>queryClient.getQueryData()</mark>
              to retrieve data from the current state. In my view, fetching data
              through this method is a lightweight and efficient operation,
              consuming minimal memory, time, and resources. Re-rendering
              components, on the other hand, can be more resource-intensive and
              is generally best avoided when unnecessary. Therefore, using{" "}
              <mark>React.memo()</mark>
              in this case significantly improves performance by reducing the
              number of re-renders, while querying the current state remains an
              easy and low-cost task.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              5. Handling Server-Side Issues
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              I’ve implemented basic error handling for server-side issues.
              Currently, if an issue occurs on the server, I simply render an
              error message on the UI. However, in a real production
              environment, this approach would be enhanced to provide better
              error management and tracking.
            </Typography>
            <br />
            In a full-scale product, it would be more effective to:
            <br />
            <List>
              <ListItem>
                <ListItemText primary="Send error logs to a monitoring system (e.g., Sentry, Datadog) to track and analyze server-side issues." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Display a user-friendly popup with an error message, providing more context or actions for the user, such as retrying the operation or contacting support." />
              </ListItem>
            </List>
            <Typography variant="body1">
              This would not only improve the user experience but also help in
              identifying and resolving backend issues quickly by providing
              real-time insights into failures.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5" component="h2">
              6. Testing
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              I’ve integrated Jest to write unit tests, ensuring the
              functionality and reliability of the code.
            </Typography>
            <br />
            <Typography>
              - I wrote a couple of tests for both React components and
              JavaScript functions.
            </Typography>
            <Typography>
              - For the <mark>Header</mark> component, I wrote a snapshot test
              to ensure the UI remains consistent.
            </Typography>
            <Typography>
              - For the <mark>Breadcrumbs</mark> component, I wrote snapshot
              tests with different parameters to verify it renders correctly in
              various cases.
            </Typography>
            <Typography>
              - I also wrote tests for the <mark>getProgressList</mark> function
              to ensure that all responses are handled as expected.
            </Typography>
            <Typography variant="body1">
              Regarding test structure, I’m aware of the debate on whether to
              place test files near the component or in a separate tests folder.
              In my opinion, placing the test files near the related component
              is more efficient. It makes it easier to find and maintain tests
              without spending extra time searching for them in a separate
              folder.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid size={12}>
        <Link href={GROCERY_LISTS}>
          <Button variant="contained" fullWidth size="large" color="success">
            Open Grocery Lists
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
