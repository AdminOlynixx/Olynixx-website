import { CORPORATES } from "@/content/corporates";
import { publishPureHealth } from "@/lib/site-config";
import { Eyebrow, Title, Lead } from "@/components/site/Section";

/* HOLD: PureHealth name stays unpublished until Louis confirms in writing. */
export function PureHealthBlock() {
  if (!publishPureHealth()) return null;

  return (
    <div>
      <Eyebrow>National scale</Eyebrow>
      <Title>{CORPORATES.pureHealthTitle}</Title>
      <Lead>{CORPORATES.pureHealthBody}</Lead>
    </div>
  );
}
