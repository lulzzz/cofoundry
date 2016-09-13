﻿using Conditions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using Cofoundry.Core;
using Cofoundry.Domain;

namespace Cofoundry.Web
{
    /// <summary>
    /// Service to abstract away the management of a users current browser session and 
    /// authentication cookie.
    /// </summary>
    public class UserSessionService : IUserSessionService
    {
        /// <summary>
        /// SetAuthCookie doesn't update the HttpContext.Current.User.Identity so we set this
        /// cache value instead which will last for the lifetime of the request. 
        /// </summary>
        private int? userIdCache = null;

        public int? GetCurrentUserId()
        {
            // Use the cache if it has been set
            if (userIdCache.HasValue) return userIdCache;

            if (HttpContext.Current == null || HttpContext.Current.User == null || !HttpContext.Current.User.Identity.IsAuthenticated) return null;
            // Otherwise get it from the Identity
            var userId = IntParser.ParseOrNull(HttpContext.Current.User.Identity.Name);
            return userId;
        }

        public void SetCurrentUserId(int userId, bool rememberUser)
        {
            Condition.Requires(userId).IsGreaterThan(0);
            FormsAuthentication.SetAuthCookie(Convert.ToString(userId), rememberUser);
            userIdCache = userId;
        }

        /// <summary>
        /// Abandons the current session and removes the users
        /// login cookie
        /// </summary>
        public void Abandon()
        {
            if (HttpContext.Current == null || HttpContext.Current.User == null) return;

            userIdCache = null;
            FormsAuthentication.SignOut();
            if (HttpContext.Current.Session != null)
            {
                HttpContext.Current.Session.Abandon();
            }
        }
    }
}