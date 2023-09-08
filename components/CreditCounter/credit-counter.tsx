"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { MAX_FREE_CREDITS } from "@/constants";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

import styles from "./credit-counter.module.scss";

interface CreditCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const CreditCounter = ({ apiLimitCount, isPro }: CreditCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function getVariant() {
    if (isPro) return "premium";
    if (apiLimitCount < MAX_FREE_CREDITS) return "primary";
    if (apiLimitCount >= MAX_FREE_CREDITS) return "premium";
  }

  if (!mounted) return null;

  return (
    <>
      {/* Free Trial Button */}
      {!isPro && (
        <button
          onClick={proModal.onOpen}
          className={styles.container}
          data-variant={getVariant()}
        >
          {/* Free Trial Progress Bar */}
          {!isPro && apiLimitCount < MAX_FREE_CREDITS && (
            <Progress
              className={styles.progress}
              value={(apiLimitCount / MAX_FREE_CREDITS) * 100}
              title={`${apiLimitCount} / ${MAX_FREE_CREDITS} free credits used`}
            />
          )}

          {/* Free Trial Ended Upgrade Button */}
          {!isPro && apiLimitCount >= MAX_FREE_CREDITS && <h3>Upgrade</h3>}
        </button>
      )}

      {/* Pro Badge */}
      {isPro && (
        <div className={styles.container} data-variant={getVariant()}>
          <h3>Pro</h3>
        </div>
      )}
    </>
  );
};
