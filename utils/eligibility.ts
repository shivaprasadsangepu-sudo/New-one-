
import { UserProfile, EligibilityCriteria } from '../types';

export interface EligibilityResult {
  isEligible: boolean;
  reasons: string[];
}

export const checkEligibility = (user: UserProfile, criteria: EligibilityCriteria): EligibilityResult => {
  const reasons: string[] = [];
  let eligible = true;

  // Calculate Age
  const birthDate = new Date(user.dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  if (criteria.minAge && age < criteria.minAge) {
    eligible = false;
    reasons.push(`Minimum age required is ${criteria.minAge} (You are ${age})`);
  }
  if (criteria.maxAge && age > criteria.maxAge) {
    eligible = false;
    reasons.push(`Maximum age allowed is ${criteria.maxAge} (You are ${age})`);
  }

  if (criteria.gender !== 'Any' && criteria.gender !== user.gender) {
    eligible = false;
    reasons.push(`Only ${criteria.gender} candidates can apply`);
  }

  if (criteria.maxIncome && user.income > criteria.maxIncome) {
    eligible = false;
    reasons.push(`Annual income must be below ₹${criteria.maxIncome.toLocaleString()}`);
  }

  if (criteria.states && !criteria.states.includes('All') && !criteria.states.includes(user.state)) {
    eligible = false;
    reasons.push(`Only for residents of ${criteria.states.join(', ')}`);
  }

  if (criteria.exServiceman && !user.isExServiceman) {
    eligible = false;
    reasons.push('Only for Ex-Servicemen');
  }

  if (criteria.disabilityRequired && !user.hasDisability) {
    eligible = false;
    reasons.push('Only for PWD candidates');
  }

  return { isEligible: eligible, reasons };
};
