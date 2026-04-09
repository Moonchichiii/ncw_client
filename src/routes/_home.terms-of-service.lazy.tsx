import { createLazyFileRoute } from "@tanstack/react-router";
import LegalModal from "@/components/ui/legal-modal";
import TermsOfServiceContent from "@/components/sections/terms-of-service";

export const Route = createLazyFileRoute("/_home/terms-of-service")({
  component: TermsOfServiceModal,
});

function TermsOfServiceModal() {
  return (
    <LegalModal title="Terms of Service">
      <TermsOfServiceContent />
    </LegalModal>
  );
}