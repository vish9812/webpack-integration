using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebpackIntegration1.Pages.Home
{
    public class IndexModel : PageModel
    {
        public string myProp { get; set; }

        public void OnGet()
        {
        }
    }
}