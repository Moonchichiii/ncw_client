import { createLazyFileRoute } from "@tanstack/react-router";
import LegalModal from "@/components/ui/legal-modal";
import PrivacyPolicyContent from "@/components/sections/privacy-policy";

export const Route = createLazyFileRoute("/_home/privacy-policy")({
  component: PrivacyPolicyModal,
});

function PrivacyPolicyModal() {
  return (
    <LegalModal title="Privacy Policy">
      <PrivacyPolicyContent />
    </LegalModal>
  );
}