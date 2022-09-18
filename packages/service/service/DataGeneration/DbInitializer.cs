using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using service.Models;
using System.Text.Json;

namespace service.Data {
    public static class DbInitializer {
        public static void UpdateContactManager(RwaContext context) {
            context.Database.EnsureCreated();
            if (context.Managers.Count() == 2) {
                var new_managers = context.Contacts
                .Take(3)
                .Select((c) => new Manager {
                    EmployeeFirstName = c.EmployeeFirstName,
                    EmployeeLastName = c.EmployeeLastName,
                    EmployeeFullName = c.EmployeeFullName,
                    EmployeePrefix = c.EmployeePrefix,
                    EmployeeTitle = c.EmployeeTitle,
                    EmployeePicture = c.EmployeePicture,
                    EmployeeAddress = c.EmployeeAddress,
                    EmployeeCity = c.EmployeeCity,
                    EmployeeStateId = c.EmployeeStateId,
                    EmployeeZipcode = c.EmployeeZipcode,
                    EmployeeEmail = c.EmployeeEmail,
                    EmployeeSkype = c.EmployeeSkype,
                    EmployeeMobilePhone = c.EmployeeMobilePhone,
                    EmployeeHomePhone = c.EmployeeHomePhone,
                    EmployeeBirthDate = c.EmployeeBirthDate,
                    EmployeeHireDate = c.EmployeeHireDate,
                    EmployeeDepartmentId = c.EmployeeDepartmentId,
                    EmployeeStatus = c.EmployeeStatus,
                    EmployeePersonalProfile = c.EmployeePersonalProfile,
                    ProbationReason = c.ProbationReason,
                    SsmaTimeStamp = c.SsmaTimeStamp
                })
                .ToList();
                context.Managers.AddRange(new_managers);
                context.SaveChanges();
            }
            var managers = context.Managers.ToList();
            var contact = context.Contacts
            .Include(c => c.TasksLists)
            .First((c) => c.EmployeeFirstName == "Sam" && c.EmployeeLastName == "Hill");
            var rand = new Random();
            contact.TasksLists
            .ToList()
            .ForEach(t => {
                t.ManagerId = managers[rand.Next(0, managers.Count)].Id;
                t.Manager = managers[rand.Next(0, managers.Count)];
            });
            context.SaveChanges();
        }
    }
}