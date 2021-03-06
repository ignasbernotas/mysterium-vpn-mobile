/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn-mobile" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { BugReporter } from './bug-reporter'
import FeedbackReporter, { UserFeedback } from './feedback-reporter'
import NativeBugReporter from './native-bug-reporter'

class FabricReporter implements BugReporter, FeedbackReporter {
  public sendException (e: Error) {
    NativeBugReporter.logException(e.message)
  }

  public setUserId (userId: string) {
    NativeBugReporter.setUserIdentifier(userId)
  }

  public sendFeedback (feedback: UserFeedback) {
    NativeBugReporter.sendFeedback(feedback.type, feedback.message)
  }
}

export { FabricReporter }
