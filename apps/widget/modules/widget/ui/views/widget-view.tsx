"use client";

import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <p>TODO: error</p>,
    loading: <p>TODO: loading</p>,
    selection: <p>TODO: selection</p>,
    voice: <p>TODO: voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: inbox</p>,
    chat: <p>TODO: chat</p>,
    contact: <p>TODO: contact</p>,
  };
  return (
    // todo: min-h-screeen is required or not
    <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
