﻿using Cofoundry.Core.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cofoundry.Core.AutoUpdate
{
    /// <summary>
    /// Settings for configuring the auto-update process. Used specifically in
    /// AutoUpdateService.
    /// </summary>
    public class AutoUpdateSettings : CofoundryConfigurationSettingsBase
    {
        public AutoUpdateSettings()
        {
            ProcessLockTimeoutInSeconds = 600;
        }

        /// <summary>
        /// Disables the auto-update process entirely.
        /// </summary>
        public bool IsDisabled { get; set; }

        /// <summary>
        /// This is the amount of time before the process lock expires and
        /// allows another auto-update process to start. This is designed to
        /// prevent multiple auto-update processes running concurrently in multi-instance
        /// deployment scenarios. By default this is set to 10 minutes which should be
        /// more than enough time for the process to run, but you may wish to shorten/lengthen 
        /// this depending on your needs.
        /// </summary>
        public int ProcessLockTimeoutInSeconds { get; set; }
    }
}
