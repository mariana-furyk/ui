/*
Copyright 2019 Iguazio Systems Ltd.

Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
import { generateLinkPath } from './parseUri'

export const generateFunctionDetailsLink = (uri = '') => {
  // remove 'latest' when function_uri will contain hash or tag
  //
  // 'my_proj/func_name@func_hash' -> projects/my_proj/functions/func_hash/overview
  // 'my_proj/func_name' -> projects/my_proj/functions/func_name/latest/overview
  // 'my_proj/func_name:custom_tag' -> projects/my_proj/functions/func_name/custom_tag/overview
  return uri
    ? `${generateLinkPath(`store://functions/${uri}`, uri.includes('@'))}${
        uri.includes(':') || uri.includes('@') ? '' : '/latest'
      }/overview`
    : ''
}
