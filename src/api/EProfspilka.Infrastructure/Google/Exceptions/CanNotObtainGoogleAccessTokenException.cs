﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EProfspilka.Infrastructure.Google.Exceptions;

public class CanNotObtainGoogleAccessTokenException(string message) : Exception
{
}