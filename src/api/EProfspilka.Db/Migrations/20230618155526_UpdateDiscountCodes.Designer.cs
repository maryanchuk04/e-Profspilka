﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using EProfspilka.Db.EF;

#nullable disable

namespace EProfspilka.Db.Migrations
{
    [DbContext(typeof(YeProfspilkaContext))]
    [Migration("20230618155526_UpdateDiscountCodes")]
    partial class UpdateDiscountCodes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EProfspilka.Core.Entities.Advantage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("MainText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Advantage");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Discount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CodeWord")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsOpen")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.DiscountCode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ActivateTimeUtc")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("Code")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DeactivateTimeUtc")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("DiscountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DiscountId");

                    b.HasIndex("UserId");

                    b.ToTable("DiscountCodes");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.EventImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.HasIndex("ImageId");

                    b.ToTable("EventImages");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Mark", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Marks");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Partner", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("MainText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubTextLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("Partners");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Question", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Student"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Moderator"
                        },
                        new
                        {
                            Id = 0,
                            Name = "NotVerified"
                        },
                        new
                        {
                            Id = 2,
                            Name = "MemberProfspilka"
                        },
                        new
                        {
                            Id = 4,
                            Name = "HeadOfUnit"
                        });
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.StudentStore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Course")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Facultet")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPaidDues")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("StudentsStore");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Course")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Facultet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.UserRole", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.UserToken", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReplacedByToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Revoked")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserTokens");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.DiscountCode", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.Discount", "Discount")
                        .WithMany()
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EProfspilka.Core.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Discount");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.EventImage", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.Event", "Event")
                        .WithMany("EventImages")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EProfspilka.Core.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Partner", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.User", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.UserRole", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EProfspilka.Core.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.UserToken", b =>
                {
                    b.HasOne("EProfspilka.Core.Entities.User", "User")
                        .WithMany("UserTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Event", b =>
                {
                    b.Navigation("EventImages");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("EProfspilka.Core.Entities.User", b =>
                {
                    b.Navigation("UserRoles");

                    b.Navigation("UserTokens");
                });
#pragma warning restore 612, 618
        }
    }
}
