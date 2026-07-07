/**
 * Freelancing feature — public exports.
 */

export type {
  FindClientLink,
  FindClientProvider,
  FreelanceDifficulty,
  FreelanceDomain,
  FreelanceDomainIcon,
  FreelanceDomainId,
  FreelanceSubdomain
} from "@/features/freelancing/types";

export {
  buildFindClientLinks,
  buildGoogleMapsUrl,
  buildIndiamartUrl,
  buildJustdialUrl,
  buildLinkedInPeopleUrl,
  freelanceCities
} from "@/features/freelancing/lib/find-clients";

export {
  freelanceDomains,
  freelanceSubdomains,
  getFreelanceSubdomainById,
  getFreelanceSubdomainsByDomain
} from "@/lib/data/freelance-catalog";
