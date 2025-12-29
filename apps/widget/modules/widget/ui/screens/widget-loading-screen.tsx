"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { WidgetHeader } from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import {
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "storage" | "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const loadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessgae = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);

  const validateOrganization = useAction(api.public.organizations.validate);

  useEffect(() => {
    if (step !== "org") return;

    setLoadingMessage("Loading Organization...");

    if (!organizationId) {
      setErrorMessgae("Organization ID is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying Organization...");

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
        } else {
          setErrorMessgae(result.reason || "Invalid configuration");
        }
      })
      .catch(() => {
        setErrorMessgae("Unable to Verify organization");
        setScreen("error");
      });
  }, [step, organizationId, setErrorMessgae, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There! 👋</p>

          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />

        <p className="text-sm">{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
