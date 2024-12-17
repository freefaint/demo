'use client';

import { Divider, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode } from "react";

export const Breadcrumbs = ({ items }: { items: { node: ReactNode }[] }) => {
  const router = useRouter();

  return (
    <Stack direction="row" alignItems="center" spacing={1} height="16px">
      {items.map(({ node }, j) => (
        <Fragment key={j}>
          <Stack>
            {node}
          </Stack>

          {j < items.length - 1 && (
            <Divider orientation="vertical" />
          )}
        </Fragment>
      ))}
    </Stack>
  )
}