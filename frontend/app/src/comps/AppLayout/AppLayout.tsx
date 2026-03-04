"use client";

import type { ReactNode } from "react";

import { Banner } from "@/Banner";
import { ProtocolStats } from "./ProtocolStats";
import { V1StabilityPoolBanner } from "@/src/comps/V1StabilityPoolBanner/V1StabilityPoolBanner";
import { V1StakingBanner } from "@/src/comps/V1StakingBanner/V1StakingBanner";
import { V1_STABILITY_POOL_CHECK, V1_STAKING_CHECK } from "@/src/env";
import { TopBar } from "./TopBar";
import { css } from "@/styled-system/css";
import { useSubgraphStatus } from "@/src/services/SubgraphStatus";
import { ErrorBanner } from "@/src/comps/ErrorBanner/ErrorBanner";

export const LAYOUT_WIDTH = 1092;
export const MIN_WIDTH = 960;

export function AppLayout({ children }: { children: ReactNode }) {
  const { hasError } = useSubgraphStatus();
  return (
    <>
      <Banner />
      {/* Background stamp decoration */}
      {/* <div
        className={css({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: "url('/stamp.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 1,
        })}
      /> */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          minHeight: "100vh",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        })}
        style={{
          minWidth: `${MIN_WIDTH}px`,
          maxWidth: `${LAYOUT_WIDTH + 24 * 2}px`,
        }}
      >
        {V1_STAKING_CHECK && <V1StakingBanner />}
        {V1_STABILITY_POOL_CHECK && <V1StabilityPoolBanner />}
        <div
          className={css({
            width: "100%",
            flexGrow: 0,
            flexShrink: 0,
            paddingBottom: 48,
          })}
        >
          <TopBar />
          {hasError && (
            <ErrorBanner
              title="We are experiencing connection issues with the subgraph at the moment. Your positions are not affected."
              children={
                <div>
                  <p>Some actions in the app may be degraded or unavailable in the meantime. Thank you for your patience as we resolve the issue.</p>
                  <p>If you have any questions, please contact us on <a className={css({ color: "primary", textDecoration: "underline" })} target="_blank" href="https://discord.gg/5h3avBYxcn">Discord</a> or <a className={css({ color: "primary", textDecoration: "underline" })} target="_blank" href="https://x.com/neriteorg">X</a>.</p>
                </div>
              }
            />
          )}
        </div>
        <div
          className={css({
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          })}
          style={{
            width: `${LAYOUT_WIDTH + 24 * 2}px`,
          }}
        >
          <div
            className={css({
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "0 24px",
            })}
          >
            {children}
          </div>
          <div
            className={css({
              width: "100%",
              padding: "48px 24px 0",
            })}
          >
            <ProtocolStats />
          </div>
        </div>
      </div>
    </>
  );
}
