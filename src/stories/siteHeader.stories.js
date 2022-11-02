import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";

export default {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/login"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <SiteHeader />;

Basic.storyName = "Default";
